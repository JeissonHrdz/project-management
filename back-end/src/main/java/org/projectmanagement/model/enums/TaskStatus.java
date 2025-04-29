package org.projectmanagement.model.enums;

public enum TaskStatus {

    pending("pending"),
    in_progress("in_progress"),
    completed("completed"),
    blocked("blocked");

    private final String displayName;

    TaskStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
