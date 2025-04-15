package org.projectmanagement.model.dto.auth;

import lombok.Builder;

@Builder
public record AuthResponseDto(
    String token
) {

}
