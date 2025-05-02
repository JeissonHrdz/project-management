package org.projectmanagement.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Null;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.projectmanagement.model.enums.TaskStatus;
import org.projectmanagement.model.enums.TaskType;

import java.sql.Timestamp;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "backlog_items")
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Integer item_id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project_id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "acceptance_criteria")
    private String acceptance_criteria;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "story_points")
    private Integer story_points;

    @Column(name = "type")
    private String type;


    @ManyToOne
    @JoinColumn(name = "epic_id")
    private Backlog epic;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP", insertable = false)
    private Timestamp created_at;

    @Column(name = "updated_at")
    private Timestamp updated_at;


}

