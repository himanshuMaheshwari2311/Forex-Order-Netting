package com.db.FxOrderNetting.controller;

import com.db.FxOrderNetting.model.ClientNetting;
import com.db.FxOrderNetting.repository.ClientNettingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(allowedHeaders = {"Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"}, methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping(value="/client")
public class ClientNettingController {

    @Autowired
    ClientNettingRepository clientNettingRepository;
    @RequestMapping(value="/netValue")
    public List<ClientNetting> getClientNet(){
        return clientNettingRepository.getClientNettingValue();
    }

    @RequestMapping(value = "/specificClientNetting/{clientId}")
    public List<ClientNetting> getSpecificClientNetting(@PathVariable int clientId){
        return clientNettingRepository.getSpecificClientNettingValue(clientId);
    }
}
