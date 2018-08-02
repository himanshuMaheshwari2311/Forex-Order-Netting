package com.db.FxOrderNetting.repository;

import com.db.FxOrderNetting.mapper.ClientNettingMapper;
import com.db.FxOrderNetting.model.ClientNetting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class ClientNettingRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<ClientNetting> getClientNettingValue()
    {
        String sql="call forexNetting.clientNetting()";
        ClientNettingMapper clientNettingMapper = new ClientNettingMapper();
        return jdbcTemplate.query(sql, clientNettingMapper );
    }

    public List<ClientNetting> getSpecificClientNettingValue(int clientId)
    {
        String sql="call forexNetting.specificClientNetting("+ clientId +")";
        ClientNettingMapper clientNettingMapper = new ClientNettingMapper();
        return jdbcTemplate.query(sql, clientNettingMapper );
    }
}
