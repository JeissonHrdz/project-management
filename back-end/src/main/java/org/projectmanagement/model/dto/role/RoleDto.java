package org.projectmanagement.model.dto.role;

import java.util.Map;

public record RoleDto(
        int role_id,
        String name,
        Map<String, Map<String, Boolean>> permissions
) {
}
