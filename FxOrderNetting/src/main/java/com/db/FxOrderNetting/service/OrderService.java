package com.db.FxOrderNetting.service;

import com.db.FxOrderNetting.model.Orders;
import com.db.FxOrderNetting.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    public List<Orders> getAllOrders(){
        return orderRepository.getAllOrders();
    }

    public boolean placeNewOrder(Orders order){
        return orderRepository.CreateNewOrder(order);
    }

    public List<Orders> getAllTrades() {
        return orderRepository.getAllTrades();
    }
}
