package com.db.FxOrderNetting.controller;


import com.db.FxOrderNetting.service.authenticationService;
import com.db.FxOrderNetting.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/authentication")
public class LoginController {

    @Autowired
    authenticationService authenticationService;

    @RequestMapping(value="/login")
    public User authentication(@RequestBody User user){
        return authenticationService.validateLogin(user);
    }
}
