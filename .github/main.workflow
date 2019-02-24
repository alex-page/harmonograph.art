workflow "Build and deploy" {
  on = "push"
  resolves = ["Build and publish"]
}

action "On push to master" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install dependencies" {
  uses = "actions/npm@master"
  needs = ["On push to master"]
  args = "install"
}

action "Master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install" {
  uses = "actions/npm@master"
  needs = ["Master branch only"]
  args = "install"
}

action "Build and publish" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
  needs = ["Install"]
}
