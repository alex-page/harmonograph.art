workflow "Publish to NPM" {
  on = "push"
  resolves = ["Build and publish"]
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
  args = "build"
  needs = ["Install dependencies"]
}

action "Build and publish" {
  uses = "actions/npm@master"
  args = "publish --access public --dry-run"
  secrets = ["NPM_AUTH_TOKEN"]
  needs = ["Build harmonograph.min.js"]
}
