import Rating from '@/ui/molecules/Rating';
import Image from 'next/image';
import React from 'react';

const CommentsSkeleton = () => {
  const comments = [1, 2, 3];
  return (
    <div className="flex flex-col gap-7 ">
      {comments.map((_, index) => (
        <div key={index} className="animate-pulse border-t-2 border-[#E8E8EC]">
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-end text-sm gap-2">
              <Image
                src={'/images/characters/default.png'}
                width={30}
                height={30}
                alt=""
              />
              {/* <span>{userName}</span> */}
            </div>
            <div className="text-right">
              <Rating value={5} readonly fillColor="#d1d5db" />
              <span className="inline-block bg-gray-300 h-3 w-20"></span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="py-2 bg-gray-200 h-3 w-full rounded-lg"></p>
            <p className="py-2 bg-gray-200 h-3 w-full rounded-lg"></p>
          </div>
          <div className="flex gap-4 pt-3 items-center justify-between">
            <div className="flex gap-4">
              <div className="flex text-gray-300 items-center gap-2  max-w-full border-2 px-4 py-2  rounded-3xl border-app-border">
                De acuerdo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.3027 9.57619C17.373 9.34181 17.4082 9.09963 17.4082 8.85353C17.4082 8.3008 17.2266 7.76955 16.8984 7.33595C16.9688 7.10158 17.0039 6.85939 17.0039 6.6133C17.0039 6.06056 16.8223 5.52931 16.4941 5.09572C16.5645 4.86134 16.5996 4.61916 16.5996 4.37306C16.5996 3.36525 16 2.45705 15.0703 2.06056C14.9069 1.99011 14.7307 1.9542 14.5527 1.95509H2.8125C2.4668 1.95509 2.1875 2.23439 2.1875 2.58009V9.68947C2.1875 10.0352 2.4668 10.3145 2.8125 10.3145H5.33789L7.01367 16.3848C7.2832 17.3633 8.18164 18.0469 9.19727 18.0469C9.77734 18.0469 10.3184 17.8164 10.7188 17.3945C11.1191 16.9746 11.3242 16.4238 11.2949 15.8438L11.1777 13.4434H15.8633C16.0996 13.4434 16.3301 13.3809 16.5332 13.2617C17.3223 12.8028 17.8125 11.9707 17.8125 11.0938C17.8125 10.541 17.6309 10.0098 17.3027 9.57619ZM3.59375 8.90627V3.35939H5.17578V8.90627H3.59375ZM15.8438 12.0391H9.70312L9.89062 15.9141C9.90234 16.1465 9.79883 16.3653 9.60547 16.5098C9.48633 16.5977 9.33984 16.6426 9.19336 16.6406C9.00621 16.6388 8.82471 16.5764 8.67609 16.4626C8.52747 16.3489 8.41977 16.19 8.36914 16.0098L6.42578 8.96877V3.35939H14.5391C14.7343 3.44688 14.9001 3.58891 15.0165 3.7684C15.1329 3.94788 15.195 4.15718 15.1953 4.37111C15.1953 4.56056 15.1504 4.74025 15.0605 4.90431L14.7891 5.40041L15.2168 5.7715C15.3372 5.87577 15.4337 6.00476 15.4998 6.14969C15.5658 6.29462 15.5999 6.45207 15.5996 6.61134C15.5996 6.8008 15.5547 6.98048 15.4648 7.14455L15.1934 7.64064L15.6211 8.01174C15.7415 8.11601 15.838 8.245 15.9041 8.38992C15.9701 8.53485 16.0042 8.69231 16.0039 8.85158C16.0039 9.04103 15.959 9.22072 15.8691 9.38478L15.5957 9.88283L16.0234 10.2539C16.1438 10.3582 16.2403 10.4872 16.3064 10.6321C16.3725 10.777 16.4065 10.9345 16.4062 11.0938C16.4062 11.4668 16.1914 11.8262 15.8438 12.0391Z"
                    fill="#d1d5db"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2  max-w-full border-2 px-4 py-2  rounded-3xl border-app-border">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.3027 10.4238C17.373 10.6582 17.4082 10.9004 17.4082 11.1465C17.4082 11.6992 17.2266 12.2305 16.8984 12.664C16.9688 12.8984 17.0039 13.1406 17.0039 13.3867C17.0039 13.9394 16.8223 14.4707 16.4941 14.9043C16.5645 15.1387 16.5996 15.3808 16.5996 15.6269C16.5996 16.6347 16 17.543 15.0703 17.9394C14.9069 18.0099 14.7307 18.0458 14.5527 18.0449H2.8125C2.4668 18.0449 2.1875 17.7656 2.1875 17.4199V10.3105C2.1875 9.96483 2.4668 9.68553 2.8125 9.68553H5.33789L7.01367 3.61522C7.2832 2.6367 8.18164 1.95311 9.19727 1.95311C9.77734 1.95311 10.3184 2.18358 10.7188 2.60545C11.1191 3.02537 11.3242 3.57615 11.2949 4.15623L11.1777 6.55662H15.8633C16.0996 6.55662 16.3301 6.61912 16.5332 6.73826C17.3223 7.19725 17.8125 8.02928 17.8125 8.90623C17.8125 9.45897 17.6309 9.99022 17.3027 10.4238ZM3.59375 11.0937V16.6406H5.17578V11.0937H3.59375ZM15.8438 7.96092H9.70312L9.89062 4.08592C9.90234 3.8535 9.79883 3.63475 9.60547 3.49022C9.48633 3.40233 9.33984 3.3574 9.19336 3.35936C9.00621 3.36117 8.82471 3.42365 8.67609 3.5374C8.52747 3.65115 8.41977 3.81004 8.36914 3.99022L6.42578 11.0312V16.6406H14.5391C14.7343 16.5531 14.9001 16.4111 15.0165 16.2316C15.1329 16.0521 15.195 15.8428 15.1953 15.6289C15.1953 15.4394 15.1504 15.2597 15.0605 15.0957L14.7891 14.5996L15.2168 14.2285C15.3372 14.1242 15.4337 13.9952 15.4998 13.8503C15.5658 13.7054 15.5999 13.5479 15.5996 13.3887C15.5996 13.1992 15.5547 13.0195 15.4648 12.8555L15.1934 12.3594L15.6211 11.9883C15.7415 11.884 15.838 11.755 15.9041 11.6101C15.9701 11.4651 16.0042 11.3077 16.0039 11.1484C16.0039 10.959 15.959 10.7793 15.8691 10.6152L15.5957 10.1172L16.0234 9.74608C16.1438 9.6418 16.2403 9.51281 16.3064 9.36789C16.3725 9.22296 16.4065 9.0655 16.4062 8.90623C16.4062 8.53319 16.1914 8.17381 15.8438 7.96092Z"
                    fill={'#d1d5db'}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsSkeleton;