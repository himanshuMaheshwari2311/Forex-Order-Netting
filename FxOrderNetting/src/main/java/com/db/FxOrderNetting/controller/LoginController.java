package com.db.FxOrderNetting.controller;


import com.db.FxOrderNetting.implementation.LoginImplementation;
import com.db.FxOrderNetting.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    LoginImplementation loginImplementation;

    @RequestMapping(value="/authentication")
    public boolean authentication(@RequestBody User user){
        return loginImplementation.validateLogin(user);
    }
}
