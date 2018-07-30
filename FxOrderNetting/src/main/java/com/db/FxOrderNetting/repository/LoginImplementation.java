package com.db.FxOrderNetting.repository;

import com.db.FxOrderNetting.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.stereotype.Repository;

@Repository
public class LoginImplementation {


    @Autowired
    JdbcTemplate jdbcTemplate;

    public User validateLogin(User user){
        User matchedUser = null;
        String sql = "select * from user where username = ? and password = ? ";
        try {
             matchedUser = jdbcTemplate.queryForObject(sql , new Object[]{user.getUserName() , user.getPassword()},
                    new BeanPropertyRowMapper<>(User.class));

             matchedUser.setPassword(null);

             //When user is a broker
             if(matchedUser.getRoleId() == 1){
                 String getNameSql = "select brokerName from broker where brokerId = ?";
                 String name = (String) jdbcTemplate.queryForObject(
                         getNameSql, new Object[] { matchedUser.getUserId() }, String.class);
                 matchedUser.setName(name);
             }
             //When user is a client
             else{
                 String getNameSql = "select clientName from client where clientId = ? ";
                 System.out.println(getNameSql );
                 String name = (String) jdbcTemplate.queryForObject(
                         getNameSql, new Object[] { matchedUser.getUserId() }, String.class);
                 matchedUser.setName(name);
             }
        }
        catch (Exception e) {
        }
        return matchedUser;
    }
}
