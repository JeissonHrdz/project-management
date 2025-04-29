package org.projectmanagement.repository;

import org.projectmanagement.model.entity.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository  extends CrudRepository<Task, Integer> {

    @Query("SELECT t FROM Task t WHERE t.sprint_id.sprint_id = :sprint_id")
    List<Task> getTasksBySprintId(Integer sprint_id);
}
