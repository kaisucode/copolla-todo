import os

def get_root():
    while os.getcwd() != "/":
        if ".proj" in os.listdir():
            return os.getcwd()
        os.chdir("..")

    return False

