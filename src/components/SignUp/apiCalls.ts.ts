export const registerUser = async (
    userName: string,
    password: string,
    setWaiting: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setIsAuthenticated?: (admin: {
        userName : string
        token: string
    }) => void,
    navigate?: (path: string) => void
) => {
    setWaiting(true);
    setError("");

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "query": `mutation SignUp { signUp(user_name: \"${userName}\", password: \"${password}\") }`
          });
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}`,
            {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            }
        );
        setWaiting(false);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `HTTP error! Status: ${response.status}, Error: ${errorText}`

            );
        }
        const resolve = await response.json();
        if (resolve.errors) {
            throw new Error(resolve.errors[0].message);
          }
        const admin = {
            userName,
            token: resolve.data.signUp,
        };
        localStorage.setItem("admin", JSON.stringify(admin));
        setIsAuthenticated && setIsAuthenticated(admin);
        navigate && navigate("/erp/products");
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === "Failed to fetch") {
                setError("network error");
            } else {
                console.log("error", error);
                setError(error.message);
            }
        }
        setWaiting(false);
    }
};

