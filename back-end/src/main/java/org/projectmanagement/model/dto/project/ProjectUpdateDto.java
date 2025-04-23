package org.projectmanagement.model.dto.project;

import java.sql.Date;

public record ProjectUpdateDto(
    String name,
    String description,
    String product_owner_id,
    String scrum_master_id,
    Date start_date,
    Date estimated_end_date,
    Date actual_end_date,
    String definition_of_done,
    String status
) {
}
