package org.projectmanagement.model.entity;


import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "task_assignments")
public class TaskAssignments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asignment_id")
    private int asignment_id;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "assignment_type")
    private String assignment_type;

    @Column(name = "assigned_at", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP", insertable = false)
    private Timestamp assigned_at;
}
