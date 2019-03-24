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

action "Publish" {
  uses = "actions/npm@master"
  args = "publish --access public --dry-run"
  needs = ["Install dependencies"]
  secrets = ["NPM_AUTH_TOKEN"]
}
