package com.db.FxOrderNetting.repository;

import com.db.FxOrderNetting.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public User getUserByUsernameAndPassword(String username , String password){
        User matchedUser = null;
        System.out.println("username : "+ username + " password: "+password);
        String sql = "select * from user where username = ? and password = ? ";
        try {
            matchedUser = jdbcTemplate.queryForObject(sql , new Object[]{username , password},
                    new BeanPropertyRowMapper<>(User.class));
            System.out.println("here");
            return matchedUser;
        }
        catch (Exception e) {
        }
        return matchedUser;
    }

}
