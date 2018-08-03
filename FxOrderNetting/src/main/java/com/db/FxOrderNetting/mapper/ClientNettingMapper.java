package com.db.FxOrderNetting.mapper;

import com.db.FxOrderNetting.model.ClientNetting;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ClientNettingMapper implements RowMapper<ClientNetting> {
    @Override
    public ClientNetting mapRow(ResultSet rs, int rowNum) throws SQLException {
        ClientNetting clientNetting = new ClientNetting();
        clientNetting.setClientName(rs.getString("clientName"));
        clientNetting.setCcyCode(rs.getString("ccyCode"));
        clientNetting.setNet(rs.getLong("net"));
        clientNetting.setValueDate(rs.getDate("valueDate"));
        return clientNetting;
    }
}
