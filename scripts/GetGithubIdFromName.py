import requests

name = input("Enter Name: ")

response = requests.get("https://api.github.com/users/" + name)

if response.status_code == 200:
    user_data = response.json()
    print(user_data.get("id"))
else:
    print("Error: Failed to retrieve user information.")

