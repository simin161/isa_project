package com.fishyfinds.isa.mappers;

import com.fishyfinds.isa.model.beans.ResolveComplaintRequest;

import java.util.Map;

public class DtoToResolveComplaint {
    public static ResolveComplaintRequest MapToResolveRequest(Map<String, String> map){
        return new ResolveComplaintRequest(Long.valueOf(map.get("complaintId")), Long.valueOf(map.get("userId")), map.get("content"), Long.valueOf(map.get("offerId")));
    }
}
