import { User, NewUser } from './users-types';

const UUID_REGEX = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export const getUserIdFromUrl = (url: string): string => {
  const parsedUrl: Array<string> | [] = url.split('/') || [];

  if (parsedUrl[parsedUrl.length - 1].match(UUID_REGEX)) {
    return parsedUrl[parsedUrl.length - 1];
  };
  return '';
};

const getData = async (req: any): Promise<NewUser> => {
  try {
    let body = '';
    await req
      .on('data', (chunk: string) => {
        body += chunk.toString();
      })
      .on('end', () => {
        console.info(`Received Data: ${body}`);
      });

    return JSON.parse(body);
  }
  catch (err: any) {
    console.info(err);
    throw new Error('Something went wrong. Please, try again');
  }
};

export const getPostData = async (req: any): Promise<NewUser> => {
  const userData = await getData(req);
  return userData;
};

export const validateNewUserData = async (newUser: NewUser): Promise<void> => {
  try {
    const { name, age, hobbies } = newUser;
    if (!name || !age || !hobbies) {
      throw new Error('All user data required!', { cause: 400 });
    }
  }
  catch (err: any) {
    console.info(err);
    throw new Error('Something went wrong. Please, try again');
  }
};
