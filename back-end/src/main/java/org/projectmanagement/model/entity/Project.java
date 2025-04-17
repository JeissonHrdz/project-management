package org.projectmanagement.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    Integer project_id;

    @Column(name = "name")
    String name;

    @Column(name = "description")
    String description;

    @Column(name = "product_owner_id")
    String product_owner_id;

    @Column(name = "scrum_master_id")
    String scrum_master_id;

    @Column(name = "start_date")
    Date start_date;

    @Column(name = "stimated_end_date")
    Date stimated_end_date;

    @Column(name = "actual_end_date")
    Date actual_end_date;

    @Column(name = "definition_of_done")
    String definition_of_done;

    @Column(name = "status")
    String status;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP", insertable = false)
    Timestamp created_at;

    @Column(name = "updated_at")
    Timestamp updated_at;


}
