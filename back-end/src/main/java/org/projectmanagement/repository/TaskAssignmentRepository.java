package org.projectmanagement.repository;

import org.projectmanagement.model.entity.TaskAssignments;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TaskAssignmentRepository  extends CrudRepository<TaskAssignments, Integer> {

    @Query("SELECT t FROM TaskAssignments t WHERE t.task.task_id = :task_id")
    List<TaskAssignments> findTaskAssignments (Integer task_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM TaskAssignments t WHERE t.task.task_id = :task_id AND t.user.user_id = :user_id")
    void unassignTaskToUser(Integer task_id, String user_id);
}
