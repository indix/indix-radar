# 📡 Indix™ Technology Radar

The Indix™ technology radar is used to assess emerging technologies in the market and their adoption strategy. This is heavily inspired by the [ThoughWorks® Radar](https://github.com/thoughtworks/build-your-own-radar).


## ⚡ Usage

To start developing for Indix-Radar, set up the environment first.

1. `npm install hexo-cli@1.0.2 webpack@1.14.0 --global`
2. `curl -o- -L https://yarnpkg.com/install.sh | bash`
3. Clone the repo and `cd` to repo directory.
4. `yarn install`

Now, each time you make a change, run Hexo's generator by using the command - 

```
hexo clean && hexo generate && webpack
```

To run the development server (say, on port `6040`), use the command - 

```
hexo server -p 6040
```

## ⚡ Development

### Adding a new topic

To create a new topic, add a new markdown file in `source\_posts`. For example, to create a new topic called "Marketing", create `source\_posts\Marketing.md`.

### Adding data for a topic

For adding data to the "Marketing" topic, create a new YAML file in `source\_data`. For example, to create a data file for the "Marketing" topic, create `source\_data\marketing.yml`.

YAML data should be of the form - 

```
- name: Marketing Product #1
  quadrant: Products
  ring: Hold
  isNew: true
  description: Insert description here
- name: Marketing Paradigm #4
  quadrant: Paradigms
  ring: Assess
  isNew: true
  description: Insert description here
- name: Marketing Concept #3
  quadrant: Concepts
  ring: Trial
  isNew: false
  description: Insert description here
- name: Marketing Algorithm #6
  quadrant: Algorithms
  ring: Adopt
  isNew: false
  description: Insert description here
```
### Formatting Options

The topic data can contain valid HTML markup! Allowed tags are -

```
'b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'br', 'p', 'u'
```

#### Heads up!
🔔  Data YAML filename should be a lowercase version of the topic markdown filename.

🔔  Each topic's data should have exactly 4 unique quadrants in total.


## ⚡ Deployment

Simply run `./deploy.sh` and BAM!

## License

Licensed under the [GNU Affero General Public License v3](LICENSE.md).
