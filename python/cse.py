import requests
from requests import Response
from bs4 import BeautifulSoup
from bs4 import NavigableString, Tag
from enum import Enum
import json

# courses = ['cse312', 'cse331']
# URL = 'https://www.cs.washington.edu/education/courses/'

# files_312 = ["slides", "sections", "homework"]
# files_331 = ["lectures", "section", "hw"]

# URL_312 = "https://courses.cs.washington.edu/courses/cse312/23au/"
# URL_331 = "https://courses.cs.washington.edu/courses/cse331/23au/"

courses = [
    {
        "name": "CSE 312",
        "files": [
            # "slides",
            # "sections",
            "homework"
            ],
        "url": "https://courses.cs.washington.edu/courses/cse312/23au/",
    },
    {
        "name": "CSE 331",
        "files": [
            # "lectures", 
            # "sections",
            "hw"
            ],
        "url": "https://courses.cs.washington.edu/courses/cse331/23au/",
    },
]

session = requests.Session()

result = {}


course: {"name": str, "files": [str], "url": str}
for course in courses:
    x = {}
    file: str
    for file in course["files"]:
        url = course["url"]
        # print(url)

        res: Response = session.get(url + file)
        parsed_res = BeautifulSoup(res.text, "html.parser")

        menu = parsed_res.find("table")
        links = menu.find_all("a", href=True)

        list = []
        for (i, l) in enumerate(links):
            list.append({"id": i, "name": l.text, "html_url": url + file + "/" + l["href"] + ""})
            x[file] = list[5:]
        
        # print(list)

    result[course["name"]] = x

json_str = json.dumps(result)
print(json_str)
