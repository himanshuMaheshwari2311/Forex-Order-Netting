package com.db.FxOrderNetting.model;

public class InstrumentInfo {
    public int ccyId;
    public String ccyCode;
    public String ccyDescription;
    public Float ccyVariance;
    public int ccyLot;

    public int getCcyId() {
        return ccyId;
    }

    public void setCcyId(int ccyId) {
        this.ccyId = ccyId;
    }

    public String getCcyCode() {
        return ccyCode;
    }

    public void setCcyCode(String ccyCode) {
        this.ccyCode = ccyCode;
    }

    public String getCcyDescription() {
        return ccyDescription;
    }

    public void setCcyDescription(String ccyDescription) {
        this.ccyDescription = ccyDescription;
    }

    public Float getCcyVariance() {
        return ccyVariance;
    }

    public void setCcyVariance(Float ccyVariance) {
        this.ccyVariance = ccyVariance;
    }

    public int getCcyLot() {
        return ccyLot;
    }

    public void setCcyLot(int ccyLot) {
        this.ccyLot = ccyLot;
    }


}
