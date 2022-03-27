declare interface UserDataInput {
  username: string;
  password: string;
}

interface Platform {
  platform: string | null;
  value: string | null;
}

declare interface Platforms {
  [key: string | number]: Platform;
}
