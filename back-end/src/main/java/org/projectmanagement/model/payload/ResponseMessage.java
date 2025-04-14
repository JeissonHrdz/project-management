package org.projectmanagement.model.payload;


import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Builder
public class ResponseMessage {

    private String message;
    private Object object;
}
