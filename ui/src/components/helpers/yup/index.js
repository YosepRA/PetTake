/* eslint-disable no-undef */
import * as yup from 'yup';

function equalTo(ref, message) {
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message,
    params: {
      reference: ref.path,
    },
    test(value) {
      return value === this.resolve(ref);
    },
  });
}

yup.addMethod(yup.string, 'equalTo', equalTo);

export default yup;
