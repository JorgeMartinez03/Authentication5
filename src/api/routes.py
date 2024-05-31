"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_bcrypt import generate_password_hash
from flask_bcrypt import check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def sign_up():
     # Obtengo los datos del cuerpo de la solicitud
    data = request.json

    # Verifico si todos los campos requeridos están presentes
    if not all(field in data for field in ['name', 'email', 'password']):
        raise APIException('Missing fields', status_code=400)

    # Verifico si el usuario ya existe en la base de datos
    if User.query.filter_by(email=data['email']).first():
        raise APIException('Email already registered', status_code=400)
    
    #Aqui lo que hago es hashear la password
    hashed_password = generate_password_hash(data['password']).decode('utf-8')

    # Aqui creo un nuevo usuario
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=hashed_password,

    )

    # Agrego el nuevo usuario a la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User successfully registered'}), 201
    

@api.route('/login', methods=['POST'])
def log_in():
    # Obtengo los datos del cuerpo de la solicitud
    data = request.json

    # Verifico si todos los campos requeridos están presentes
    if not all(field in data for field in ['email', 'password']):
        raise APIException('Missing fields', status_code=400)

    # Obtengo el usuario de la base de datos según el correo electrónico
    user = User.query.filter_by(email=data['email']).first()

    # Verifico si el usuario existe y si la contraseña coincide
    if user and check_password_hash(user.password, data['password']):
        # Genero un token de acceso JWT
        access_token = create_access_token(identity=user.id)

        return jsonify(access_token=access_token), 200
    else:
        raise APIException('Invalid email or password', status_code=401)
    

@api.route("/profile", methods=["GET", "PUT"])
@jwt_required()
def protected():
    # Obtengo la identidad del token JWT
    current_user_id = get_jwt_identity()

    # Obtengo la información del usuario actual desde la base de datos
    current_user = User.query.get(current_user_id)

    if request.method == "GET":
        # Si es una solicitud GET, devuelvo los detalles del usuario
        return jsonify(current_user.serialize()), 200
                       
    elif request.method == "PUT":
        # Si es una solicitud PUT, actualizo el perfil del usuario
        data = request.get_json()

        # Actualizo los campos relevantes (por ejemplo, el nombre, correo electrónico y contraseña)
        if 'name' in data:
            current_user.name = data['name']
        if 'email' in data:
            current_user.email = data['email']
        if 'password' in data:
            # Hasheo la nueva contraseña antes de guardarla
            hashed_password = generate_password_hash(data['password']).decode('utf-8')
            current_user.password = hashed_password

        # Guardo los cambios en la base de datos
        db.session.commit()
        message = {"message" : "The user has been updated"}
        final_data = { **current_user.serialize(), **message}

        return jsonify(final_data), 200