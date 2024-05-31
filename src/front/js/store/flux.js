const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},signUp: async (name, email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: name,
							email: email,
							password: password
						}),
					});
					const data = await resp.json();
					console.log(data);

					// Actualiza el estado global con la información del usuario
					setStore({ user: data });

					return data;
				} catch (error) {
					console.log("Error signing up", error);
				}
			},
			signIn: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: email,
							password: password
						}),
					});
					const data = await resp.json();

					// Actualiza el estado global con la información del usuario si la autenticación es exitosa
					if (resp.ok) {
						// Almacena el token en localStorage
						localStorage.setItem("jwt-token", data.access_token);
						console.log("User signed in successfully!");
						return true;
					} else {
						// Si hay un error, lógica para manejarlo (p. ej., mostrar un mensaje de error)
						console.log("Error signing in:", data.message);
						return false;
					}

				} catch (error) {
					console.log("Error signing in:", error);
					return false;
				}
			},
			logOut: () => {
				// Borra el objeto user del estado global
				setStore({ user: null });

				// Borra el token del almacenamiento local
				localStorage.removeItem("jwt-token");

				// Muestra un mensaje de éxito
				// toast.success("Has cerrado sesión correctamente");
			},
			getUser: async () => {
				try {
					const token = localStorage.getItem("jwt-token");
					const resp = await fetch(process.env.BACKEND_URL + "/api/profile", {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					if (!resp.ok) {
						throw new Error("Error al obtener datos del usuario");
					}

					const data = await resp.json();

					// Actualiza el estado global con la información del usuario
					setStore({ user: data });

					return data;
				} catch (error) {
					console.log("Error al obtener datos del usuario", error);
					throw error;
				}
			},
		}
	};
};

export default getState;