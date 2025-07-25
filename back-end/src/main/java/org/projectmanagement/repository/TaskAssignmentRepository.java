package org.projectmanagement.repository;

import org.projectmanagement.model.entity.TaskAssignments;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskAssignmentRepository  extends CrudRepository<TaskAssignments, Integer> {

    @Query("SELECT t FROM TaskAssignments t WHERE t.task.task_id = :task_id")
    List<TaskAssignments> findTaskAssignments (Integer task_id);
}
