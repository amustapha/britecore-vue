# Brytecore Engineering Challenge API
This is a solution to the britecore engineering challenge where the problem is to simply create flexible daa models that can accommodate different kinds of risks within the insurance domain.

Here's a quote from their page
> Since BriteCore was created to work mostly with property-based insurance, the data model is pretty rigid. The data model assumes that all risks are properties and have addresses. This makes it difficult for BriteCore to work with different forms of insurance like Automobile Policies, Cyber Liability Coverage (protection against hacking), or Prize Insurance (if someone gets a $1 million hole-in-one prize at a golf tournament, the golf course doesn't pay it, they have an insurance policy to cover them).

# Solution Approach

My method of solving the problem was by creating a system that allows creating and managing custom forms. Each form is tied to a Risk (establishing a one-to-many relationship between Risk and Field). With two django models in place (Risk and Field), I was able to create a many to one relationship between my risk model and form field model. Each field can have a defined type (which supports most html input types, textarea, dropdown menu, checkboxes, radio bottons and date with a custom date picker).
Using [buefy](https://buefy.github.io/) UI library, I sketched out a basic UI that displays all existing risks on one page and a generated form based on the fields described on the risk. I used [VueJS](https://vuejs.org) on the frontend and [django rest framework](https://django-rest-framework.org) for the backend with the default SQLite as the database.

# Setup
You might need to setup the [api](https://github.com/m-bryo/britecore-api) if you haven't done that already.

``` bash
# clone the project
git clone https://github.com/m-bryo/britecore.git

# install dependencies
cd britecore
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

