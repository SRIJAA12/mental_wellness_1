'use client';

import React from 'react';

interface WellnessGoal {
  id: string;
  title: string;
  isCompleted: boolean;
  progress: number;
}

interface WellnessGoalsProps {
  goals: WellnessGoal[];
}

const WellnessGoals: React.FC<WellnessGoalsProps> = ({ goals }) => {
  return (
    <div className="card border-0 shadow">
      <div className="card-header">
        <h6 className="mb-0 fw-bold">
          <i className="fas fa-bullseye text-warning me-2"></i>
          Wellness Goals
        </h6>
      </div>
      <div className="card-body">
        {goals.length > 0 ? (
          <div className="space-y-3">
            {goals.map((goal) => (
              <div key={goal.id} className="d-flex justify-content-between align-items-center p-2 border rounded">
                <span>{goal.title}</span>
                <span className={`badge ${goal.isCompleted ? 'bg-success' : 'bg-warning'}`}>
                  {goal.isCompleted ? 'Complete' : `${goal.progress}%`}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted">No wellness goals set yet</p>
            <button className="btn btn-primary btn-sm">Set Your First Goal</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessGoals;
