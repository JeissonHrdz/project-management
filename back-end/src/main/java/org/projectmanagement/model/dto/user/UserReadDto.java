package org.projectmanagement.model.dto.user;

public record UserReadDto(
        String user_id,
        String username,
        String email,
        String first_name,
        String last_name,
        Integer role_id,
        Boolean is_scrum_master,
        Boolean is_product_owner
) {
}
