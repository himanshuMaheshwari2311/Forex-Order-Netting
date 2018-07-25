package com.db.FxOrderNetting.implementation;

import com.db.FxOrderNetting.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class LoginImplementation {


    @Autowired
    JdbcTemplate jdbcTemplate;

    public boolean validateLogin(User user){
        String sql = "select * from user where username = ? and password = ? ";
        try {
            User u = jdbcTemplate.queryForObject(sql , new Object[]{user.getUserName() , user.getPassword()},
                    new BeanPropertyRowMapper<>(User.class));
        }
        catch (Exception e) {
            return false;
        }
        return true;
    }
}
