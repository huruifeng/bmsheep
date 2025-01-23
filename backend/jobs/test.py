from time import sleep


def run_test():
    print("Running job:Test...")
    for i in range(10):
        print("sleeping...",i)
        sleep(5)

    return "OK"

if __name__ == "__main__":
    run_test()