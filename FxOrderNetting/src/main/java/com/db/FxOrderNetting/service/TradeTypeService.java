package com.db.FxOrderNetting.service;

import com.db.FxOrderNetting.model.TradeType;
import com.db.FxOrderNetting.repository.TradeTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TradeTypeService {

    @Autowired
    TradeTypeRepository tradeTypeRepository;

    public List<TradeType> getAllTradeType(){
        return tradeTypeRepository.getTradeType();
    }
}
