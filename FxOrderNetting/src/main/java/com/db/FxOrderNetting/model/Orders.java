package com.db.FxOrderNetting.model;

public class Orders {
    public int orderId;
    public int clientId;
    public int ccyId;
    public long baseNotional;
    public char direction;
    public float price;
    public int tradeTypeId;
    //public datetime tradeDate;
    //public datetime createdAt;
    //public datetime modifiedAt;
    //public datetime cancelledAt;
    //public datetime deletedAt;


    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public int getCcyId() {
        return ccyId;
    }

    public void setCcyId(int ccyId) {
        this.ccyId = ccyId;
    }

    public long getBaseNotional() {
        return baseNotional;
    }

    public void setBaseNotional(long baseNotional) {
        this.baseNotional = baseNotional;
    }

    public char getDirection() {
        return direction;
    }

    public void setDirection(char direction) {
        this.direction = direction;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getTradeTypeId() {
        return tradeTypeId;
    }

    public void setTradeTypeId(int tradeTypeId) {
        this.tradeTypeId = tradeTypeId;
    }
}
