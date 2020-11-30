# ProjectRegistryFrontend

Angular frontend for managing and maintaining projects

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Configuration for GitHub Actions Workflow

There are a variety of secrets that must be configured on the repository for the GitHub Actions Workflow to complete successfully.

On the repository, navigate to `Settings > Secrets` and configure the below secrets

- `ECR_REGISTRY`
  - This is the docker repository name for Revature's ECR Account
  - It is of the form `<aws_account_id>.dkr.ecr.region.amazonaws.com`
- `ECR_REPOSITORY`
  - This is the name of the ECR repository which houses this service's images
  - They are often named corresponding to the trainer's name and batch id
- `SONAR_TOKEN`
  - This is the credential token to submit analysis reports to sonarcloud
- `AWS_REGION`
  - The region where the cloud resources are provisioned
  - Generally `us-east-1`
- `ECR_ACCESS_KEY_ID` and `ECR_SECRET_ACCESS_KEY`
  - The credentials to access ECR
  - Provided by Center of Excellence
- `EKS_ACCESS_KEY_ID` and `EKS_SECRET_ACCESS_KEY`
  - The credentials to access EKS
  - Provided by Center of Excellence
- `CLUSTER_NAME`
  - The name of the EKS cluster provisioned for the project
  - Generally named similarly to the `ECR_REPOSITORY`
  - Provided by Center of Excellence
- `APP_NAME`
  - The identifier for this service
  - Primarily for use within the Kubernetes Cluster
  - `project-registry-frontend` for this service

Note that `GITHUB_TOKEN` does not need to be created.