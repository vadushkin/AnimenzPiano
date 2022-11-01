FROM python:3.11
MAINTAINER Vadim <vadimshalapugin@gmail.com>

RUN apt-get update && apt-get upgrade -y && apt-get autoremove && apt-get autoclean

RUN mkdir /site
COPY . /site/
WORKDIR /site

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ENTRYPOINT ["python", "manage.py"]
CMD ["runserver", "0.0.0.0:8000"]
