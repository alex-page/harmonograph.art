workflow "Build and deploy" {
  on = "push"
  resolves = ["Publish"]
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

action "Build javascript" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install dependencies"]
  args = "build"
}

action "Publish" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Build javascript"]
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
