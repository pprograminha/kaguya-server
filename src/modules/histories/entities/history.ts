import crypto from 'crypto';

type HistoryProps = {
  user_id: string;
  class_id: string;
  created_at: Date;
  updated_at: Date;
};

class History {
  id: string;

  props: HistoryProps;

  get user_id(): string {
    return this.props.user_id;
  }

  get class_id(): string {
    return this.props.class_id;
  }

  get created_at(): Date {
    return this.props.created_at;
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
