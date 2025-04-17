package org.projectmanagement.model.dto.project;

import java.sql.Date;

public record ProjectCreateDto(
    String name,
    String description,
    String product_owner_id,
    String scrum_master_id,
    Date start_date,
    Date stimated_end_date
) {
}
