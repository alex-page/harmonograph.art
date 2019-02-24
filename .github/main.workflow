workflow "Publish to NPM" {
  on = "push"
  resolves = ["Publish"]
}

action "Master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install dependencies" {
  uses = "actions/npm@master"
  args = "install"
  needs = ["Master branch only"]
}

action "Build harmonograph.min.js" {
  uses = "actions/npm@master"
  args = "run build"
  needs = ["Install dependencies"]
}

action "Publish" {
  uses = "actions/npm@master"
  args = "publish --access public"
  needs = ["Build harmonograph.min.js"]
  secrets = ["NPM_AUTH_TOKEN"]
}
