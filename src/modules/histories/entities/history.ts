import crypto from 'crypto';

type HistoryProps = {
  user_id: string;
  lesson_id: string;
  recent_at: Date;
  created_at: Date;
  updated_at: Date;
};

class History {
  id: string;

  props: HistoryProps;

  get user_id(): string {
    return this.props.user_id;
  }

  get lesson_id(): string {
    return this.props.lesson_id;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get recent_at(): Date {
    return this.props.recent_at;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  constructor(props: HistoryProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.props = props;
  }
}

export { History };
