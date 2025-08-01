package org.projectmanagement.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.projectmanagement.model.enums.SprintStatus;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
@Table(name = "sprints")
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sprint_id")
    private Integer sprint_id;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project_id;

    @Column(name = "name")
    private String name;

    @Column(name = "goal")
    private String goal;

    @Column(name = "start_date")
    private Date start_date;

    @Column(name = "end_date")
    private Date end_date;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(columnDefinition = "status")
    private SprintStatus status;

    @Column(name = "estimated_velocity")
    private Integer estimated_velocity;

    @Column(name = "actual_velocity")
    private Integer actual_velocity;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP", insertable = false)
    private Timestamp created_at;

    @Column(name = "updated_at")
    private Timestamp updated_at;



}
