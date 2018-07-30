package com.db.FxOrderNetting.service;

import com.db.FxOrderNetting.model.User;
import com.db.FxOrderNetting.repository.BrokerRepository;
import com.db.FxOrderNetting.repository.ClientRepository;
import com.db.FxOrderNetting.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class authenticationService {

    @Autowired
    JdbcTemplate jdbcTemplate;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BrokerRepository brokerRepository;
    @Autowired
    ClientRepository clientRepository;

    public User validateLogin(User user){
        User matchedUser = userRepository.getUserByUsernameAndPassword(user.getUserName(),user.getPassword());
        if(matchedUser != null){
             matchedUser.setPassword(null);

             //When user is a broker
             if(matchedUser.getRoleId() == 1){
                 matchedUser.setName( brokerRepository.getNameByBrokerId(matchedUser.getUserId()));
             }
             //When user is a client
             else{
                 matchedUser.setName(clientRepository.getNameByClientId(matchedUser.getUserId()));
             }
        }
        return matchedUser;
    }
}
