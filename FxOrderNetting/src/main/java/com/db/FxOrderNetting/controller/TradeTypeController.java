package com.db.FxOrderNetting.controller;

import com.db.FxOrderNetting.model.TradeType;
import com.db.FxOrderNetting.service.TradeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"}, methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping(value="/tradeType")
public class TradeTypeController {

    @Autowired
    TradeTypeService tradeTypeService;

    @RequestMapping(value="/getAll")
    public List<TradeType> getAllTradeType(){
        return tradeTypeService.getAllTradeType();
    }
}
