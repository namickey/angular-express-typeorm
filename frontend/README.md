# frontend

```shell
ng new frontend

cd frontend
```

## vscode terminal setting

`>Preferences: Open User Settings (JSON)`

```json
 "terminal.integrated.env.windows": {
        "PSExecutionPolicyPreference": "RemoteSigned"
    }
```

## Development server

```shell
ng serve
```

`http://localhost:4200/`

## add user-table component

```shell
ng generate component user-table
ng generate service users
```


## Code scaffolding

Run `ng generate component component-name` to generate a new component.  
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.  

## Build

```shell
ng build
```
